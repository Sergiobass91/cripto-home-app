const InputForm = ( { typeRef, typeInput, id, text } ) => {
  return (
    <div className="floating-input mb-5 relative">
      <input
        type={typeInput}
        id={id}
        className="border border-gray-200 focus:outline-none rounded-md focus:border-[#658eec] focus:shadow-sm w-full p-3 h-16"
        placeholder="example"
        ref={typeRef}
      />
      <label
        htmlFor={id}
        className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
      >
        {text}
      </label>
    </div>
  );
};

export default InputForm;
