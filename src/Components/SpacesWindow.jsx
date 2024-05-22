import { useMutation } from '@tanstack/react-query';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUrlApi } from '../api/axiosConfig';


const SpacesWindow = ({
  selectedSpace,
  setSelectedSpace,
  postSpace,
  isNew,
  putSpace
}) => {

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [observation, setObservation] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile ] = useState(undefined);
  const [spaceName, setSpaceName] = useState('');

  useEffect(() => {
    if (!!selectedSpace){
      setSpaceName(selectedSpace.nombre);
      setImage(`${imageUrlApi}/${selectedSpace.imagen}`);
      setObservation(selectedSpace.descripcion);
    }
  }, [selectedSpace]);

  const handleObservations = (observation) => {
    setObservation(observation);
    // const updatedSpaces = [...spaces];
    // const index = updatedSpaces.findIndex(space => space.name === selectedSpace);
    // updatedSpaces[index].observation = observation;
    // setSpaces(updatedSpaces);
  };

  const handleAddComponents = async () => {
    // const updatedSpaces = [...spaces];
    // const index = updatedSpaces.findIndex(space => space.name === selectedSpace);
    // const currentSpace = updatedSpaces[index];

    // currentSpace.observation = observation;
    // currentSpace.image = image;

    // setSpaces(updatedSpaces);

    // const imageBase64 = image ? await toBase64(image) : null;
    // const dataToSend = { observation, image: imageBase64, spaceName };

    navigate(`${selectedSpace.id}`);
  };

  // const toBase64 = file => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // });

  const handleAddImage = () => fileInputRef.current.click();
  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(file));

    // const updatedSpaces = [...spaces];
    // const index = updatedSpaces.findIndex(space => space.name === selectedSpace);
    // updatedSpaces[index].image = file;
  };

  
  const handleCloseWindow = () => {
    setSelectedSpace(undefined);
  };

  const handleSaveAndClose = () => {
    if (isNew){
      postSpace({spaceName, observation, file})
    } else {
      putSpace({idSpace: selectedSpace.idHabitacion, spaceName, observation, file})
    }
    handleCloseWindow(); 
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
        <div className="relative">
          <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
            <input className="text-2xl mb-4 font-bold" value={spaceName} onChange={(e) => setSpaceName(e.target.value)}/>
            <ul>
              <li className="mb-2">
                <div>
                  <button
                    onClick={() => handleObservations(selectedSpace.descripcion)}
                    className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                  >
                    <span>Observaciones</span>
                  </button>
                </div>
                {selectedSpace.descripcion && (
                  <div className="px-16">
                    <input
                      value={observation}
                      type="text"
                      onChange={(e) => handleObservations(e.target.value)}
                      className="mt-2 text-sm w-full p-2 border border-black"
                      placeholder="Escribe tus observaciones aquí"
                    />
                  </div>
                )}
              </li>
              { !isNew &&
                <li className="flex justify-start items-center mb-2">
                  <button
                    onClick={handleAddComponents}
                    className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                  >
                    <span className="mr-2"> + </span>
                    <span>Añadir Componentes</span>
                  </button>
                </li>
              }
              <li className="flex justify-start items-center mb-2">
                <button
                  onClick={handleAddImage}
                  className="flex items-center px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed w-80 h-10"
                >
                  <span className="text-firstColor mr-2">+</span>
                  <span className="text-firstColor">Añadir Fotografía</span>
                </button>
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </li>
              {image && (
                <div>
                  <p>Imagen seleccionada</p>
                  <img
                    src={image}
                    alt="Imagen seleccionada"
                    style={{ maxWidth: '25%', marginTop: '10px' }}
                  />
                </div>
              )}
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

export default SpacesWindow;
