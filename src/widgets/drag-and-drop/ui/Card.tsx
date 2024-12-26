import React, { FC } from 'react'
import { CardData } from '../types/dnd-widget'

interface CardProps {
  data: CardData,
  allowDraggingFromThis: boolean,
  isDragging: boolean,
  handleDragging: (isDragging: boolean) => void,
}

const card = 'px-4 py-1 border-2 border-solid rounded-md border-violet-700 border-r-4 duration-0'
const draggableCard = card + ' hover:duration-200 hover:border-r-8 hover:cursor-pointer active:duration-75 active:bg-violet-500 active:p-2'

/**
 * Renders a single card component.
 *
 * @component
 * @param {CardProps} props - The component props.
 * @param {CardData} props.data - The data for the card.
 * @param {boolean} props.allowDraggingFromThis - Whether dragging is allowed on this card.
 * @param {boolean} props.isDragging - Indicates whether the card is currently being dragged.
 * @param {(isDragging: boolean) => void} props.handleDragging - Callback function to handle dragging state changes.
 * @returns {JSX.Element} The rendered card element.
 *
 * @example
 * // Basic usage:
 * <Card data={cardData} />
 *
 * @example
 * // Usage with dragging enabled:
 * <Card data={cardData} allowDraggingFromThis isDragging handleDragging={() => console.log('Dragging')} />
 */
export const Card:FC<CardProps> = ({data, allowDraggingFromThis, isDragging, handleDragging}) => {

  return (
    <li className={allowDraggingFromThis ? draggableCard : card}
        draggable={allowDraggingFromThis}
        onDragStart={(e: React.DragEvent<HTMLLIElement>) => {
          e.dataTransfer.setData('text', `${data.id}`)
          handleDragging(true)
        }}
        onDragEnd={() => handleDragging(false)}
    >
      <p>{data.text}</p>
    </li>
  )
}
