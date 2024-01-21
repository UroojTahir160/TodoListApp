import { useAuth } from "../../context/AuthContext";
import { SwitchToggle } from "./SwitchToggle";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";
import ProfileIcon from "../../assets/icons/profile-icon.png";

/**
 * It renders a sticky header with a title and a switch toggle.
 */
export const Header = () => {
  const { user } = useAuth();
  return (
    <header class="sticky top-0 bg-primary-900 z-10">
      <section class="flex flex-row mx-auto py-4 px-6 justify-between">
        <h1 className="text-2xl xs:text-3xl text-white font-Lora">
          Todo List App 📝
        </h1>
        <div className="flex gap-5 flex-row items-center">
          <div>
            <SwitchToggle />
          </div>
          {user && (
            <ProfileDropdown
              photoURL={user.photoURL ? user.photoURL : ProfileIcon}
            />
          )}
        </div>
      </section>
    </header>
  );
};
