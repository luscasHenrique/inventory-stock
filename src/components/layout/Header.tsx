// src/components/layout/Header.tsx
export function Header() {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Inventory System</h1>
      <div className="flex items-center gap-4">
        {/* Aqui você pode colocar o nome do usuário, logout, notificações, etc */}
        <span className="text-sm text-gray-600">Bem-vindo(a)!</span>
      </div>
    </header>
  );
}
