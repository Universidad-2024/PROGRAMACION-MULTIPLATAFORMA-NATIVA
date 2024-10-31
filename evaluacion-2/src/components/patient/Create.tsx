import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { api } from "@/api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export enum Gender {
    MASCULINO = 'Masculino',
    FEMENINO = 'Femenino',
}

export const formSchema = z.object({
    rut: z.string().regex(/^[0-9]{7,8}-[0-9Kk]$/, {
        message: 'Rut inválido (12345678-9)',
    }),
    name: z.string().min(3, {
        message: 'Mínimo 3 caracteres',
    }),
    age: z.coerce.number().int().positive('Edad debe ser positiva'),
    gender: z.enum([Gender.FEMENINO, Gender.MASCULINO], {
        message: 'Sexo inválido',
        invalid_type_error: 'Sexo inválido',
    }),
    disease: z.string().min(3, {
        message: 'Mínimo 3 caracteres',
    }),
});

export interface FormValues {
    rut: string;
    name: string;
    age: number
    gender: Gender | undefined,
    disease: string;
}

export const Create = () => {

    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rut: '',
            name: '',
            age: 0,
            gender: undefined,
            disease: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await api.create(data);
            toast.success('Paciente creado');
            form.reset();
            navigate('/paciente/lista');
        } catch (error) {
            toast.error('Error al crear paciente');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="rut"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rut</FormLabel>
                            <FormControl>
                                <Input placeholder="11111111-8" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Juanito" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Edad</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} min={1} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sexo</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione una opción" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.entries(Gender).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>{value}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="disease"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Enfermedad
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    Crear
                </Button>
            </form>
        </Form>
    )
}

