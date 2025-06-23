import input from "@/app/components/ui/Input";

function Input({ type = 'text', placeholder, value, onChange, required }) {
    return (
        <input 
            type={type}
            className="px-2 py-1 border w-80 rounded text-slate-950 "
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}

export default Input;