import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from '@/components/Header'
import { HomeTask } from '@/pages/task/HomeTask'
import { TasksState } from '@/pages/task/TasksState';
import { Panel } from '@/pages/task/Panel';
import { Reports } from '@/pages/task/Reports';
import { Files } from '@/pages/task/Files';
import { NavBar } from '../components/NavBar';
import { Index } from '../pages/Index';
import { Filters } from '../pages/task/Filters';
import { RPState } from '@/pages/report/RPState';
import { RPPanel } from '../pages/report/RPPanel';
import { RPReport } from '@/pages/report/RPReport';
import { HomeReport } from '../pages/report/HomeReport';
import { HomeSettings } from '../pages/settings/HomeSettings';
import { GLTasks } from '@/pages/settings/GLTasks';
import { Contacts } from '@/pages/settings/Contacts';

export const DashBoard = () => {
    return (
        <Routes>
            <Route path='/' element={<Header />}>

                <Route
                    path='task'
                    element={<NavBar
                        title='Tareas'
                        options={[
                            {
                                icon: 'home',
                                text: 'Inicio',
                                toEspecific: '/task'
                            },
                            {
                                icon: 'shield',
                                text: 'Estado de suc',
                                toEspecific: '/task/estado'
                            },
                            {
                                icon: 'radio',
                                text: 'Panel sin señal',
                                toEspecific: '/task/panel'
                            },
                            {
                                icon: 'bell',
                                text: 'Reportes de alarma',
                                toEspecific: '/task/alarma'
                            },
                            {
                                icon: 'filter',
                                text: 'Filtros',
                                toEspecific: '/task/filters'
                            }
                        ]}
                    />}
                >
                    <Route
                        path='estado'
                        element={<TasksState />}
                    />
                    <Route
                        path='panel'
                        element={<Panel />}
                    />
                    <Route
                        path='alarma'
                        element={<Reports />}
                    />
                    <Route
                        path='docs/:name/:id'
                        element={<Files />}
                    />

                    <Route
                        path='filters'
                        element={<Filters />}
                    />

                    <Route
                        index
                        element={<HomeTask />}
                    />
                    <Route path="*" element={<HomeTask />} />
                </Route>

                <Route
                    path='report'
                    element={<NavBar
                        title='Reportes'
                        options={[
                            {
                                icon: 'home',
                                text: 'Inicio',
                                toEspecific: '/report'
                            },
                            {
                                icon: 'shield',
                                text: 'Estado de suc',
                                toEspecific: '/report/estado'
                            },
                            {
                                icon: 'radio',
                                text: 'Panel sin señal',
                                toEspecific: '/report/panel'
                            },
                            {
                                icon: 'bell',
                                text: 'Reportes de alarma',
                                toEspecific: '/report/alarma'
                            }
                        ]}
                    />}
                >
                    <Route
                        path='estado'
                        element={<RPState />}
                    />
                    <Route
                        path='panel'
                        element={<RPPanel />}
                    />
                    <Route
                        path='alarma'
                        element={<RPReport />}
                    />

                    <Route
                        index
                        element={<HomeReport />}
                    />
                    <Route path="*" element={<HomeReport />} />

                </Route>

                <Route
                    path='setting'
                    element={<NavBar
                        title='Configuración'
                        options={[
                            {
                                icon: 'home',
                                text: 'Inicio',
                                toEspecific: '/setting'
                            },
                            {
                                icon: 'activity',
                                text: 'Tareas globales',
                                toEspecific: '/setting/tasks'
                            },
                            {
                                icon: 'users',
                                text: 'Contactos',
                                toEspecific: '/setting/contacts'
                            }
                        ]}
                    />}
                >

                    <Route
                        path='tasks'
                        element={<GLTasks />}
                    />

                    <Route
                        path='contacts'
                        element={<Contacts />}
                    />

                    <Route
                        index
                        element={<HomeSettings />}
                    />
                    <Route path="*" element={<HomeSettings />} />

                </Route>

                <Route
                    index
                    element={<Index />}
                />
                <Route path="*" element={<Index />} />
            </Route>

        </Routes>

    )
}

