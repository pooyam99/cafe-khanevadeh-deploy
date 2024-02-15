import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Main, Admin } from './components/roots';
import { Home, Menu, Reserve, Contact } from './components/pages';
import { Toaster } from 'sonner';
import { GlobalStyles } from './styles/GlobalStyles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'reserve', element: <Reserve /> },
      { path: 'contact', element: <Contact /> },
    ]
  },
  // {
  //   path: '/admin',
  //   element: <Admin />
  // }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster dir='rtl' toastOptions={{ style: GlobalStyles.toaster }} />
    </>
  );
}

export default App;
