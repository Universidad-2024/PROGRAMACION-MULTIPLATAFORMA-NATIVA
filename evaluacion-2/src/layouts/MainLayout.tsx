import { AppSidebar } from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className='flex'>
            <AppSidebar />

            <main className='p-2 min-h-screen w-screen'>
                <Outlet />
            </main>
        </div>
    )
}
