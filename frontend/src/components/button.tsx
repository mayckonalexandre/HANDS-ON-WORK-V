interface IButtonProps {
  label: string;
}

export function Button(props: IButtonProps) {
  return (
    <button
      className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {props.label}
    </button>
  );
}
