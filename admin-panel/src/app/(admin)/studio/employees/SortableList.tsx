'use client'

import { useState, useTransition } from 'react'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'
import { reorder } from './actions'
import { ADMIN_PATH } from '@/auth/constants'

function Row({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  return (
    <li
      ref={setNodeRef}
      className="adm-sortable__row"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
    >
      <button className="adm-drag" {...attributes} {...listeners} aria-label="Переместить">
        ⠿
      </button>
      {item.photo?.url && (
        <img
          src={item.photo.sizes?.thumb?.url ?? item.photo.url}
          alt=""
          width={36}
          height={45}
          style={{ objectFit: 'cover', borderRadius: 2 }}
        />
      )}
      <Link href={`${ADMIN_PATH}/employees/${item.id}`} className="adm-sortable__title">
        {item.name}
      </Link>
      <span className="adm-muted">{item.position}</span>
      {item.showOnHome && <span className="adm-badge">на главной</span>}
      <span className={`adm-badge adm-badge--${item._status}`}>
        {item._status === 'published' ? 'Опубликован' : 'Черновик'}
      </span>
    </li>
  )
}

export default function SortableList({ initial }: { initial: any[] }) {
  const [items, setItems] = useState(initial)
  const [pending, start] = useTransition()

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const next = arrayMove(
      items,
      items.findIndex((i) => i.id === active.id),
      items.findIndex((i) => i.id === over.id)
    )
    setItems(next)
    start(() => {
      reorder(next.map((i, idx) => ({ id: String(i.id), order: idx })))
    })
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <ul className={pending ? 'adm-sortable is-saving' : 'adm-sortable'}>
          {items.map((i) => (
            <Row key={i.id} item={i} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
