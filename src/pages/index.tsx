import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { CardsList, CardData } from "@/widgets/drag-and-drop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const [DnDItemsList, setDnDItemsList] = useState<CardData[]>([
    {id: '1', text: 'abcde', listId: '1'},
    {id: '2', text: '12345', listId: '1'},
    {id: '3', text: '!@#$%', listId: '1'},
    {id: '4', text: 'bespinpa', listId: '2'}
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const handleDragging = (isDragging: boolean) => setIsDragging(isDragging);

  const handleUpdateList = (id: string, newListId: string) => {
    let card = DnDItemsList.find(item => item.id == id)
    if (card && card.listId !== newListId) {
      card.listId = newListId
      setDnDItemsList(prev => ([
        ...prev.filter(item => item.id != id),
        card
      ]))
    }
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col gap-28 h-screen justify-center items-center sm:flex-row`}
    >
      <CardsList 
        id="1"
        items={DnDItemsList}
        allowDraggingFromThis
        isDragging={isDragging}
        handleDragging={handleDragging}
        handleUpdateList={handleUpdateList}
      />
      <CardsList
        id="2"
        items={DnDItemsList}
        isDragging={isDragging}
        handleDragging={handleDragging}
        handleUpdateList={handleUpdateList}
      />
    </div>
  );
}
