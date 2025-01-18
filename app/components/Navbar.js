export default function Navbar() {
    return (
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">clarity</h1>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/journal" className="hover:text-blue-500">Journal</a></li>
          </ul>
        </div>
      </nav>
    );
  }
  