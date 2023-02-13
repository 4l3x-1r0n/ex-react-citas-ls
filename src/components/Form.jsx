import { useEffect, useState } from "react";
import Error from "./Error";

function Form({ pacientes, setPacientes, paciente, setPaciente }) {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [alta, setAlta] = useState("");
    const [sintomas, setSintomas] = useState("");

    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(paciente).length) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setAlta(paciente.alta);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // validar formulario
        if (
            [
                nombre.trim(),
                propietario.trim(),
                email.trim(),
                alta.trim(),
                sintomas.trim(),
            ].includes("")
        ) {
            setError(true);
            return;
        }

        setError(false);
        const objetoPaciente = {
            nombre: nombre.trim(),
            propietario: propietario.trim(),
            email: email.trim(),
            alta: alta.trim(),
            sintomas: sintomas.trim(),
        };

        if (paciente.id) {
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map((pacienteState) =>
                pacienteState.id === paciente.id
                    ? objetoPaciente
                    : pacienteState
            );
            setPacientes(pacientesActualizados);
        } else {
            objetoPaciente.id = Date.now();
            setPacientes(pacientes.concat(objetoPaciente));
        }

        setPaciente({});

        // reiniciando el nombre
        setNombre("");
        setPropietario("");
        setEmail("");
        setAlta("");
        setSintomas("");
    };

    const name = () => {
        return;
    };

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>
            <p className="text-lg mt-5 text-center my-10">
                Añade Pacientes y{" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                action=""
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                {error && <Error>Todos los campos son obligatorios</Error>}
                <div className="mb-5">
                    <label
                        htmlFor="nombre-mascota"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        id="nombre-mascota"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="Alta"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Alta
                    </label>
                    <input
                        type="date"
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={alta}
                        onChange={(e) => setAlta(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Sintomas
                    </label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        name=""
                        id="sintomas"
                        cols="30"
                        rows="5"
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    ></textarea>
                </div>
                <input
                    type="submit"
                    name=""
                    id=""
                    value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                />
            </form>
        </div>
    );
}

export default Form;
