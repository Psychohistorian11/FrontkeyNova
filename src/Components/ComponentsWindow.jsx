// ComponentsWindow.jsx
import React, { useRef, useState } from 'react';


const ComponentsWindow = ({
  selectedComponent,
  postForniture,
  putForniture,
  setShowModal
}) => {
  const fileInputRef = useRef(null);
  const [ file, setFile ] = useState(null);
  const [image, setImage] = useState(selectedComponent.imagen === '' ? null : `${imageUrlApi}/${selectedComponent.imagen}`)

  const [ form, setForm ] = useState({
    name: selectedComponent.nombre,
    observation: selectedComponent.descripcion,
    state: selectedComponent.estado
  })

  function handleChange(e){
    const { name, value } = e.target

    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }


  // Manejo de imagen
  const handleAddImage = () => fileInputRef.current.click();
  const handleFileChange = async (event) => {
    const inputFile = event.target.files[0]
    setFile(inputFile);
    
    setImage(URL.createObjectURL(inputFile));
  };

  const handleSaveAndClose = () => {
    if (selectedComponent.nombre === ''){
      postForniture({
        name: form.name, 
        description: form.observation,
        state: form.state,
        image: file})
    } else {
      putForniture({
        idForniture: selectedComponent.idMueble, 
        name: form.name, 
        description: form.observation,
        state: form.state,
        image: file})
    }
    setShowModal(false); 
  }

  const handleCloseWindow = () => {
    setShowModal(false);
  };

  return (
    <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className="relative">
            <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
              <ul>
                <li className='w-full space-x-5 mb-5'>
                  <label className='font-semibold text-2xl'>Nombre</label>
                  <input className="text-xl mb-4 pl-4 w-3/4 font-medium border border-gray-400 rounded" 
                  value={form.name} 
                  onChange={handleChange}
                  placeholder='Nombre'
                  name="name"/>
                </li>
                <li className="flex items-center mt-2 mb-6 space-x-5 ">
                  <label className='text-xl mr-10'>Estado</label>
                  {/* Aquí van los radio buttons */}
                  <div className="mt-2 flex items-center justify-center space-x-12">
                    <div className='flex flex-col items-center space-y-2'>
                      <input
                        type="radio"
                        name="state"
                        value="malo"
                        checked={form.state === "malo"}
                        onChange={handleChange}
                        className= 'form-radio w-10 appearance-none h-10 rounded-full border-2 checked:bg-red-600 border-red-600 text-red-600 hover:bg-red-600 hover:bg-opacity-100 transition-colors'
                      />
                      <label className="text-xs">Malo</label>
                    </div>

                    <div className='flex flex-col items-center space-y-2'>
                      <input
                        type="radio"
                        name="state"
                        value="regular"
                        checked={form.state === "regular"}
                        onChange={handleChange}
                        className= 'w-10 appearance-none h-10 rounded-full border-2 checked:bg-yellow-500 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-100 transition-colors'
                      />
                      <label className="text-xs">Regular</label>
                    </div>

                    <div className='flex flex-col items-center space-y-2'>
                      <input
                        type="radio"
                        name="state"
                        value="bueno"
                        checked={form.state === "bueno"}
                        onChange={handleChange}
                        className= 'w-10 appearance-none h-10 rounded-full border-2 checked:bg-green-600 border-green-600 text-green-600 hover:bg-green-600 hover:bg-opacity-100 transition-colors'
                      />
                      <label className="text-xs">Bueno</label>
                    </div>
                  </div>
                </li>
                <li className="mb-2 ">
                  <label className='text-xl'>Observaciones</label>
                  <input
                    className="mt-2 h-36 text-sm w-full pl-4 border border-gray-400 rounded align-top items-start"
                    value={form.observation}
                    type="text"
                    onChange={handleChange}
                    name="observation"
                    placeholder="Escribe tus observaciones aquí"
                  />
              </li>

                <li className="flex justify-start items-center mb-2 mt-6">
                  <button 
                    onClick={handleAddImage}
                    className="flex items-center w-full px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed h-10"
                  >
                    <span className="text-firstColor mr-2">+</span>
                    <span className="text-firstColor">Añadir fotografía</span>
                  </button>
                  <input
                    type="file"
                    id="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </li>
                <div>
                  {
                    form.image != '' &&
                    <img
                      src={image}
                      alt="Imagen seleccionada"
                      style={{ maxWidth: '25%', marginTop: '10px' }}
                    />
                  }
                </div>
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
                  onClick={handleSaveAndClose}
                >
                  Guardar y Cerrar
                </button>
              </div>
            </div>
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={handleCloseWindow}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>
        </div>
    </>
  );
};

export default ComponentsWindow;
