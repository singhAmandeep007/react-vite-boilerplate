# src/components/layout

Components relating to layout should be placed in this directory.

Consider using additional subdirectories with the same format (component + story + unit test) for subcomponents to aid in organization.

Example:

- layout/Sidebar/
  - SidebarItem/
    - SidebarItem.tsx
    - SidebarItem.stories.tsx
    - SidebarItem.spec.tsx
  - SidebarSection/
    - SidebarSection.tsx
    - SidebarSection.stories.tsx
    - SidebarSection.spec.tsx
  - Sidebar/
    - Sidebar.tsx
    - Sidebar.stories.tsx
    - Sidebar.spec.tsx
  - index.ts
