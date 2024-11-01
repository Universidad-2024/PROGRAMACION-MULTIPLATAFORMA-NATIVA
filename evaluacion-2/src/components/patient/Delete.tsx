import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
    id: string;
    name: string;
    children?: React.ReactNode;
}

export const Delete = ({ id, name, children }: Props) => {

    const navigate = useNavigate();

    const handleDelete = () => {
        api.delete(id);
        navigate('/paciente/lista');
        toast.success('Paciente eliminado');
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children ? children : <Button variant="outline">Revisado</Button>}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Paciente {name} marcar como revisado
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro de que deseas marcar como revisado al paciente {name}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
