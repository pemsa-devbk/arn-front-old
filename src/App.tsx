import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { DashBoard } from './routes/DashBoard';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider  client={queryClient}>
      <BrowserRouter>
        <DashBoard />
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover
          draggable
        />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
