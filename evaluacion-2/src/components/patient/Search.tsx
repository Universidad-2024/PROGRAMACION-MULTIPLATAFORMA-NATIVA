import { SearchIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const Search = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (search.length < 1) return toast.error('Ingrese un valor para buscar');
        if (search.trim().length < 1) return toast.error('Ingrese un valor para buscar');
        navigate(`/paciente/buscar/${search}`);
        setSearch('');
    }


    return (
        <div className='bg-white p-4 flex gap-2 shadow mb-4'>
            <Input placeholder='Buscar Paciente' className='w-1/3' value={search} onChange={(e) => setSearch(e.target.value)} min={1} />
            <Button size="icon" variant="default" onClick={handleSearch}>
                <SearchIcon />
            </Button>
        </div>
    )
}
