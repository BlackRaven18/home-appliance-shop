import { RouterProvider} from "react-router-dom";
import router from './router/router';

export default function MyApp() {
  return (
      <div>
          <RouterProvider router={router} />
      </div>
  );
}
