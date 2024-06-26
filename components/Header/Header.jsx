import { Menu, Group, NavLink, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./navbar.module.css";

const links = [
  { link: "https://api.tiklydown.eu.org", label: "Api untuk pengembang" },
  {
    link: "#2",
    label: "Support",
    links: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <h2>SnapTok</h2>
          <Group gap={5} visibleFrom="sm">
            <NavLink
              href="https://api.snaptok.xyz/"
              label="Api untuk pengembang"
              target="_blank"
            />
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
