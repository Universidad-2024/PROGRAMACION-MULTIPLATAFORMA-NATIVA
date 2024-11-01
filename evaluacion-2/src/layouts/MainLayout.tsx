import { Search } from '@/components/patient/Search';
import { AppSidebar } from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className='flex'>
            <AppSidebar />

            <div className='min-h-screen w-screen'>
                <Search />

                <main className='p-2'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
