
const AdminFooter = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800
    px-5 md:px-8 py-4 mt-auto">

      <div className="flex flex-col sm:flex-row
      justify-between items-center gap-2">

        <p className="text-xs text-zinc-500">
          © 2026 NEXORA. All rights reserved.
        </p>

        <p className="text-xs text-zinc-500">
          Admin Dashboard <span className="text-yellow-500">v1.0</span>
        </p>

      </div>

    </footer>
  );
};

export default AdminFooter;
