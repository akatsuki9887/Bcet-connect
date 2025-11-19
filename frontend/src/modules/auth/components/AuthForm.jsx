export default function AuthForm({ title, fields, onSubmit }) {
  return (
    <div className="max-w-md mx-auto p-6 border rounded mt-10 shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
        >
          {title}
        </button>
      </form>
    </div>
  );
}
