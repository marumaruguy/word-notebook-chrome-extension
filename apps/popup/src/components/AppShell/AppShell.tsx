import { ActionIcon, AppShell, Burger, Group, NavLink, Title, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSettings, IconBook, IconX } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ApplicationShell({ children }: { children: React.ReactNode }) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const links = [
        { icon: IconBook, label: 'Vocabulary List', to: '/vocabulary' },
        { icon: IconSettings, label: 'Settings', to: '/settings' },
    ];

    const mainLinks = links.map((link) => (
        <NavLink
            key={link.label}
            active={location.pathname === link.to}
            label={link.label}
            /* @ts-ignore */
            leftSection={<link.icon size="1rem" stroke={1.5} />}
            onClick={() => {
                navigate(link.to);
                close();
            }}
        />
    ));

    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} />
                        <Title order={3}>Vocabulary Revision</Title>
                    </Group>
                    <ActionIcon variant="subtle" color="gray" onClick={() => window.close()}>
                        {/* @ts-ignore */}
                        <IconX size="1.2rem" />
                    </ActionIcon>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                {children}
            </AppShell.Main>
            <Drawer opened={opened} onClose={close} title="Menu">
                {mainLinks}
            </Drawer>
        </AppShell>
    );
}
