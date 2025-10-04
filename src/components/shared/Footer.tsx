export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="border-t border-slate-700 mt-6 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Md. Shahidul Islam Shanto. All rights
        reserved.
      </div>
    </footer>
  );
}
