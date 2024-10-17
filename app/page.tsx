import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">Welcome to CVC Words Fun!</h1>
      <p className="text-xl mb-8 text-gray-700">Learn and play with Consonant-Vowel-Consonant words</p>
      <div className="space-y-4">
        <Link href="/drag-and-drop">
          <Button className="w-64 h-16 text-xl bg-yellow-400 hover:bg-yellow-500 text-black">
            Drag and Drop Letters
          </Button>
        </Link>
        <br />
        <Link href="/match-sounds">
          <Button className="w-64 h-16 text-xl bg-yellow-400 hover:bg-yellow-500 text-black">
            Match Letters to Sounds
          </Button>
        </Link>
        <br />
        <Link href="/blend-sounds">
          <Button className="w-64 h-16 text-xl bg-yellow-400 hover:bg-yellow-500 text-black">
            Blend Sounds
          </Button>
        </Link>
      </div>
    </div>
  );
}