import { SwitchToggle } from "./SwitchToggle";

/**
 * It renders a sticky header with a title and a switch toggle.
 */
export const Header = () => {
  return (
    <header class="sticky top-0 bg-primary-900 z-10">
      <section class="flex flex-row mx-auto py-4 px-6 justify-between">
        <h1 className="text-2xl xs:text-3xl text-white font-Lora">Todo List App 📝</h1>
        <SwitchToggle />
      </section>
    </header>
  );
};
