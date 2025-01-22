import {
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchUsers, updateUserRoles } from '../helpers/users';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { ROLES } from '../constants';
import SearchBox from '../components/SearchBox';

const UserRolesPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [confirmationMessage, setConfirmationMessage] = useState(true);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const isRoleMatch =
      selectedFilter === 'all' || user.roles.includes(selectedFilter);
    const isSearchMatch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    return isRoleMatch && isSearchMatch;
  });

  const handleSaveChanges = async (users) => {
    try {
      await updateUserRoles(users);

      setConfirmationMessage(true);
      setTimeout(() => {
        setConfirmationMessage(false);
      }, 5000);
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  };

  const handleroleChange = (e, userId, role) => {
    const checked = e.target.checked;
    const user = users.find((user) => user.id === userId);

    if (checked) {
      user.roles.push(role);
    } else {
      user.roles = user.roles.filter((currentRole) => currentRole !== role);
    }

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, roles: [...user.roles] };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  return (
    <PageContainer>
      <PageHeader title="Permisos de Usuarios" isLoading={loading}>
        <NavigationButton href="/home" text="Inicio ►" />
      </PageHeader>
      <SearchBox
        value={search}
        onChange={handleSearchChange}
        label="Buscar usuario"
        filterOptions={[
          { value: 'all', label: 'Todos' },
          { value: 'admin', label: 'Administradores' },
          { value: 'moderator', label: 'Moderadores' },
          { value: 'customer', label: 'Clientes' },
        ]}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        maxWidth="400px"
        margin="1rem auto 4rem"
        placeholder="Buscar usuario..."
      />
      <Box
        className="urp-divider"
        sx={{ margin: '1rem 0', borderTop: '1px solid #ccc' }}
      />
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'end',
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleSaveChanges(users)}
          sx={{ margin: '1rem 0' }}
        >
          Guardar Cambios
        </Button>
        {confirmationMessage && (
          <Typography color="success">
            Cambios guardados correctamente.
          </Typography>
        )}
      </Box>
      <Box sx={{ padding: 2 }}>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'space-evenly',
            }}
          >
            {filteredUsers.map((user) => (
              <Card key={user.id} sx={{ marginBottom: 2 }}>
                <CardHeader title={user.username} subheader={user.email} />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.roles.includes(ROLES.admin)}
                        onChange={(e) =>
                          handleroleChange(e, user.id, ROLES.admin)
                        }
                      />
                    }
                    label="Admin"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.roles.includes(ROLES.moderator)}
                        onChange={(e) =>
                          handleroleChange(e, user.id, ROLES.moderator)
                        }
                      />
                    }
                    label="Moderador"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.roles.includes(ROLES.customer)}
                        onChange={(e) =>
                          handleroleChange(e, user.id, ROLES.customer)
                        }
                      />
                    }
                    label="Cliente"
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default UserRolesPage;
