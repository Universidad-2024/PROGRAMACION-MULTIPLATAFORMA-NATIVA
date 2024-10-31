import { useForm } from "react-hook-form"
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
import { formSchema, Gender } from "./Create"
import { Patient } from "@/interface"

interface Props {
    patient: Patient;
}

interface FormValues {
    rut: string;
    name: string;
    age: number
    gender: Gender,
    disease: string;
}

export const Update = ({ patient }: Props) => {
    const navigate = useNavigate();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rut: patient.rut,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            disease: patient.disease,
        }
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await api.update(patient._id, data);
            toast.success('Paciente Actualizado');
            navigate('/paciente/lista');
        } catch (error) {
            toast.error('Error al actualizar paciente');
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
                    Actualizar
                </Button>
            </form>
        </Form>
    )
}

