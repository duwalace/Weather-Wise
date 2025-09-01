"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  isSearching: boolean;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, isSearching, disabled = false }: SearchBarProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() && !disabled) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Pesquisar por uma cidade..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-grow shadow-sm pl-10"
        disabled={isSearching || disabled}
      />
      <Button type="submit" disabled={isSearching || !city.trim() || disabled}>
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pesquisar'}
      </Button>
    </form>
  );
}
