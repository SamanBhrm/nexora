import {LayoutDashboard,Package,Layers,Store,X} from "lucide-react";

const AdminSidebar = ({ activePage, setActivePage, isOpen, setIsOpen }) => {

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
    { id: "products", title: "Products", icon: Package },
    { id: "categories", title: "Categories", icon: Layers },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        border-r border-zinc-800 bg-zinc-950 text-white transition-transform
        duration-300 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="flex h-20 items-center justify-between border-b border-zinc-800 px-6">
          <h1 className="text-2xl font-black tracking-wider">
            NEX<span className="text-yellow-500">ORA</span>
          </h1>

          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <div className="px-5 py-7">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Management
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition
                    ${activePage === item.id
                      ? "bg-yellow-500 text-black"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                >
                  <Icon size={19} />
                  {item.title}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-zinc-800 p-5">
          <div className="rounded-xl bg-zinc-900 p-4">
            <p className="text-sm font-bold">NEXORA Admin</p>
            <p className="mt-1 text-xs text-zinc-500">Management Panel</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar