interface Props {
    message: string;
    redirect: string;
    status: number;
}

export const Error = ({ message = 'Página no encontrada', redirect = '/', status = 404 }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold text-red-500">{status}</h1>
        <p>{message}</p>
        <a href={redirect} className="text-blue-500">Volver</a>
      </div>
    </div>
  )
}
