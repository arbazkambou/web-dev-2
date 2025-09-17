import Loader from '../../ui/Loader';
import MenuItem from './MenuItem';

export default function Menu() {
  return (
    <ul className="divide-y divide-stone-200 px-2">
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </ul>
  );
}
