
import { Link } from 'react-router-dom';

const AdminPanel = ({children}) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5">
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <nav className="space-y-4">
          <Link to="/admin/addProduct" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">
            Add Products
          </Link>
          <Link to="/admin/viewOrders" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">
            View Orders
          </Link>
          <Link to="/admin/manage-users" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">
            Manage Users
          </Link>
          <Link to="/admin/settings" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">
            Settings
          </Link>
          <Link to="/" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600">
            Go to Home
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        <h2 className="text-3xl font-bold mb-5">Dashboard</h2>
        <p className="text-gray-700">
        {children}
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
