import React, { FC, useEffect, useState } from 'react'
import { Card } from './Card'
import { CardData } from '../types/dnd-widget'

interface CardsListProps {
  id: string,
  items: CardData[],
  allowDraggingFromThis?: boolean,
  isDragging: boolean,
  handleDragging: (isDragging: boolean) => void,
  handleUpdateList: (id: string, newListId: string) => void,
}

const container = `flex min-w-60 flex-col gap-3 bg-violet-400 rounded-xl p-4`

/**
 * A component for rendering a list of cards.
 *
 * @component
 * @param {CardsListProps} props - The component props.
 * @param {string} props.id - The unique identifier for this card list.
 * @param {CardData[]} props.items - An array of card objects.
 * @param {boolean} [props.allowDraggingFromThis=false] - Whether dragging is allowed on this list.
 * @param {boolean} props.isDragging - Indicates whether the list is currently being dragged.
 * @param {(isDragging: boolean) => void} props.handleDragging - Callback function to handle dragging state changes.
 * @param {(id: string, newListId: string) => void} props.handleUpdateList - Callback function to update the list when an item is dropped.
 * @returns {JSX.Element} The rendered card list.
 *
 * @example
 * // Basic usage:
 * <CardsList id="list1" items={cardItems} />
 *
 * @example
 * // Usage with dragging enabled:
 * <CardsList id="list2" items={cardItems} allowDraggingFromThis />
 */
export const CardsList:FC<CardsListProps> = ({
  id, items, 
  allowDraggingFromThis = false, 
  isDragging, 
  handleDragging, 
  handleUpdateList,
}) => {

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text');
    handleUpdateList(itemId, id);
    handleDragging(false)
  }

  return (
    <ul className={container}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
    >
      {
        items.map(item => (
          item.listId === id &&
          <Card
            key={item.id}
            data={item}
            allowDraggingFromThis={allowDraggingFromThis}
            isDragging={isDragging}
            handleDragging={handleDragging}
          />
        ))
      }
    </ul>
  )
}
