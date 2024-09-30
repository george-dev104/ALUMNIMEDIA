'use client'

import { Fetch } from "@/app/lib/Fetch";
import Icon from "@/atoms/Icon";
import { Channel } from "@/types/Channel";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Channel[]>([]);

    const handleSearch = useDebouncedCallback(
        async (input: string) => {
            if (input.trim().length === 0) return setResults([]);
            const res = await Fetch('/api/channels/search', 'post', { query: input });
            if (res.error) return toast.error('Please try again.');
            setResults(res.channels);
        },
        300
    )

    return (
        <>
            <div className="relative border border-grey border-solid flex flex-row items-stretch gap-2 p-2 bg-white bg-opacity-30 backdrop-blur rounded">
                <input type="text" placeholder="Search" value={query} onChange={(e) => { setQuery(e.target.value); handleSearch(e.target.value); }} className="bg-transparent w-[100px] lg:w-auto focus-within:outline-none placeholder:text-white/80 text-white" />
                <Icon icon="search" size={20} fill="fill-white" />
                <div className="absolute w-[275px] right-0 lg:left-0 top-[50px] rounded-md overflow-hidden z-50 max-h-80 bg-black/80 backdrop-blur-3xl overflow-y-auto">
                    {results.map(result => {
                        return <SearchResult key={result.id} src={result.profile_image_src} name={result.name} username={result.username} />
                    })}
                </div>
            </div>
        </>
    )
}

function SearchResult({ src, name, username }: { src: string, name: string, username: string }) {
    return (
        <Link href={`/channels/${username}`} className="flex flex-row items-center justify-start gap-3 p-4 w-full">
            <div className="relative w-16 h-16 rounded-full overflow-hidden aspect-square border border-solid border-white">
                <img className="absolute left-0 top-0 w-full h-full object-contain" src={src} alt="" />
            </div>
            <div>
                <p className="text-sm">{name}</p>
                <p className="text-sm">@{username}</p>
            </div>
        </Link>
    )
}