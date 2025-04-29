'use client';

import { useManageUsers } from '@/app/manager-users/useManageUsers';
import { UserRole } from '@/types/models/User';
import { Trash2, KeyRound, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function ManageUsersPage() {
  const {
    users,
    newUser,
    setNewUser,
    handleCreate,
    handleDelete,
    handlePasswordReset,
    handleRoleChange,
    handleUpdateRole,
  } = useManageUsers();

  const [passwordInputs, setPasswordInputs] = useState<Record<number, string>>(
    {},
  );

  const roles: { label: string; value: UserRole }[] = [
    { label: 'Administrador', value: UserRole.Admin },
    { label: 'Editor', value: UserRole.Editor },
    { label: 'Visualizador', value: UserRole.Viewer },
    { label: 'Vendedor', value: UserRole.Seller },
    { label: 'Super Admin', value: UserRole.SuperAdmin },
  ];

  const handlePasswordChange = (userId: number, value: string) => {
    setPasswordInputs((prev) => ({ ...prev, [userId]: value }));
  };

  const handlePasswordSave = (userId: number) => {
    const newPassword = passwordInputs[userId];
    if (!newPassword) return;
    handlePasswordReset(userId, newPassword);
    setPasswordInputs((prev) => ({ ...prev, [userId]: '' })); // limpa input depois de salvar
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">
        Gerenciar Usuários
      </h1>

      {/* Formulário de Criação */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Criar Novo Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              placeholder="Usuário"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="w-full md:w-1/3"
            />
            <Input
              placeholder="Senha"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="w-full md:w-1/3"
            />
            <Select
              value={newUser.role}
              onValueChange={(value) =>
                setNewUser({ ...newUser, role: value as UserRole })
              }
            >
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleCreate}
              variant="default"
              className="w-full md:w-auto"
            >
              Criar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Nova Senha</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>

                    {/* Cargo */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value as UserRole)
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((r) => (
                              <SelectItem key={r.value} value={r.value}>
                                {r.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={() => handleUpdateRole(user.id)}
                          variant="outline"
                          size="icon"
                          title="Salvar alteração de cargo"
                        >
                          <CheckCircle size={18} />
                        </Button>
                      </div>
                    </TableCell>

                    {/* Nova senha */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Nova senha"
                          type="password"
                          value={passwordInputs[user.id] || ''}
                          onChange={(e) =>
                            handlePasswordChange(user.id, e.target.value)
                          }
                          className="w-[140px]"
                        />
                        <Button
                          onClick={() => handlePasswordSave(user.id)}
                          variant="outline"
                          size="icon"
                          title="Salvar nova senha"
                        >
                          <KeyRound size={16} />
                        </Button>
                      </div>
                    </TableCell>

                    {/* Data de criação */}
                    <TableCell>
                      {user.created_at?.slice(0, 19).replace('T', ' ')}
                    </TableCell>

                    {/* Ações */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleDelete(user.id)}
                          variant="destructive"
                          size="icon"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500"
                    >
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
