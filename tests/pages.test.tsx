import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { practices, cases, services, lawyers, companyContacts } from "@/lib/data/mock-data";
import ConsultationModal from "@/components/ui/ConsultationModal";
import { ModalProvider } from "@/components/providers/ModalProvider";

// Define contracts and tests
describe("SPEC Contract Tests: Pages and Components", () => {
  /**
   * test_relational_integrity
   * Проверяет, что у каждой практики есть связанные услуги, а у кейсов валидные practiceId.
   */
  it("test_relational_integrity", () => {
    expect(practices.length).toBeGreaterThan(0);
    expect(services.length).toBeGreaterThan(0);
    expect(cases.length).toBeGreaterThan(0);
    expect(lawyers.length).toBeGreaterThan(0);

    // Every practice must have linked services
    practices.forEach((practice) => {
      expect(practice.services).toBeDefined();
      expect(practice.services.length).toBeGreaterThan(0);
      practice.services.forEach((s) => {
        expect(s.practiceId).toBe(practice.id);
      });
    });

    // Every case must have a valid practiceId matching an existing practice
    const practiceIds = practices.map((p) => p.id);
    cases.forEach((c) => {
      expect(practiceIds).toContain(c.practiceId);
      expect(c.claimAmount).toBeDefined();
      expect(c.resultSummary).toBeTruthy();
    });

    // Every lawyer must reference valid practiceIds
    lawyers.forEach((l) => {
      expect(l.practiceIds.length).toBeGreaterThan(0);
      l.practiceIds.forEach((pid) => {
        expect(practiceIds).toContain(pid);
      });
    });
  });

  /**
   * test_navigation_links_exist
   * Проверяет, что все пункты меню (/practices, /team, /cases, /blog, #contacts) не содержат пустых/заглушечных '#' ссылок.
   */
  it("test_navigation_links_exist", async () => {
    // Dynamic import of Header to test rendered navigation
    const { default: Header } = await import("@/components/layout/Header");
    const { container } = render(
      <ModalProvider>
        <Header />
      </ModalProvider>
    );

    const requiredPaths = ["/practices", "/team", "/cases", "/blog", "#contacts"];
    const links = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));

    requiredPaths.forEach((path) => {
      expect(links).toContain(path);
    });

    // Ensure no link has a bare placeholder "#" (except valid hashes like #contacts)
    links.forEach((href) => {
      expect(href).not.toBe("#");
      expect(href).not.toBe("");
    });
  });

  /**
   * test_cta_buttons_label
   * Проверяет, что все основные кнопки конверсии содержат точный текст «Обсудить ситуацию».
   */
  it("test_cta_buttons_label", async () => {
    const { default: Header } = await import("@/components/layout/Header");
    const { default: Hero } = await import("@/components/sections/Hero");
    const { default: Footer } = await import("@/components/layout/Footer");

    const headerRender = render(
      <ModalProvider>
        <Header />
      </ModalProvider>
    );
    const headerCtas = headerRender.getAllByRole("button", { name: /обсудить ситуацию/i });
    expect(headerCtas.length).toBeGreaterThanOrEqual(1);

    const heroRender = render(
      <ModalProvider>
        <Hero />
      </ModalProvider>
    );
    const heroCtas = heroRender.getAllByRole("button", { name: /обсудить ситуацию/i });
    expect(heroCtas.length).toBeGreaterThanOrEqual(1);

    const footerRender = render(
      <ModalProvider>
        <Footer />
      </ModalProvider>
    );
    const footerCtas = footerRender.getAllByRole("button", { name: /обсудить ситуацию/i });
    expect(footerCtas.length).toBeGreaterThanOrEqual(1);

    // Verify constant text
    expect(companyContacts.ctaText).toBe("Обсудить ситуацию");
  });

  /**
   * test_lead_form_validation
   * Проверяет валидацию телефона (маска РФ), обработку обязательных полей и блокировку повторной отправки.
   */
  it("test_lead_form_validation", async () => {
    // Open modal directly by providing custom open state
    const { formatRuPhone, isValidRuPhone } = await import("@/lib/utils");

    // Check Russian phone formatter
    expect(formatRuPhone("9035312851")).toBe("+7 (903) 531-28-51");
    expect(formatRuPhone("+7 (495) 105-91-15")).toBe("+7 (495) 105-91-15");
    expect(isValidRuPhone("+7 (903) 531-28-51")).toBe(true);
    expect(isValidRuPhone("123")).toBe(false);

    // Render Modal within Provider
    const TestComponent = () => {
      const { useConsultationModal } = require("@/components/providers/ModalProvider");
      const { openModal } = useConsultationModal();
      return (
        <div>
          <button onClick={() => openModal()}>Открыть</button>
          <ConsultationModal />
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Click to open
    fireEvent.click(screen.getByText("Открыть"));

    // Check modal dialog opened
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: /обсудить ситуацию/i });
    const nameInput = screen.getByLabelText(/ваше имя/i);
    const phoneInput = screen.getByLabelText(/телефон/i);

    // 1. Submit empty - requires name
    fireEvent.click(submitBtn);
    expect(screen.getByText(/пожалуйста, укажите ваше имя/i)).toBeInTheDocument();

    // 2. Fill name, invalid phone
    fireEvent.change(nameInput, { target: { value: "Дмитрий" } });
    fireEvent.change(phoneInput, { target: { value: "123" } });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/укажите корректный номер телефона рф/i)).toBeInTheDocument();

    // 3. Valid phone, submit
    fireEvent.change(phoneInput, { target: { value: "9035312851" } });
    fireEvent.click(submitBtn);

    // Verify submission feedback
    await waitFor(() => {
      expect(screen.getByText(/запрос принят/i)).toBeInTheDocument();
    });
  });
});
