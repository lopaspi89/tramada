import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../Header/Header";
import { useMaterials } from "../../hooks/useMaterial.jsx";
import { handleDelete, handleEdit } from "../../utils/utils.js"
import { filterCategories } from "../../utils/filterCategories.js";
import { updateMaterial } from "../../actions/rawMaterial.js";
 
export function RawMaterials({ user, setUser}) {
    const [ name, setName ] = useState(""); //1
    const [ typeMaterial, setTypeMaterial] = useState(""); //2
    const [ color, setColor ] = useState(""); //3
    const [ stock, setStock ] = useState(""); //4
    const [ weight, setWeight ] = useState(""); //5
    const [ price, setPrice ] = useState(''); //6
    const [ vendor, setVendor ] = useState(""); //7
    const [ category, setCategory ] = useState(""); //8
    const [ idMaterial, setIdMaterial ]  = useState(null);
    const [ listType, setListType ] = useState('none');
    const [ isListMaterials, setisListMaterials ] = useState(true);
    const { search,
            setSearch,
            materials,
            setIdSupplier,
            supplies,
            categories,
            filteredMaterials
        } = useMaterials();
    const navigate = useNavigate()
    console.log(filteredMaterials());
    
    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
            navigate('/')
        }
    }, [user, navigate])
    
    console.log(idMaterial);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newMaterials = { 
            nombre_insumo: name,
            tipo_insumo: typeMaterial,
            color_insumo: color,
            cantidad_insumo: stock,
            peso_insumo: weight,
            precio_insumo: price,
            id_proveedor: vendor,
            categoria_insumos_id: category
        };
        const values = Object.values(newMaterials);

        console.log(idMaterial);

        if(values !== undefined) {
            if (idMaterial !== null) {
                updateMaterial(newMaterials, idMaterial)
            }
            return;
        }
        setName("");
        setTypeMaterial('')
        setColor('');
        setStock("");
        setWeight("");
        setPrice('');
        setVendor("");
        setCategory("");
        console.log('Áqui 3');
    };
    console.log(idMaterial);
    return (
        <>
          <Header user={user} setUser={setUser} />
          <button className="button-back" onClick={() => navigate("/home")} />
          <div className="menu-productos-container">
            <h1>Gestión de </h1>
    
            {/* Formulario para agregar o modificar productos */}
            <form onSubmit={handleSubmit} className="form-producto">
              <div className="form-group">
                <label>Nombre del Material</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Tipo del Material</label>
                <input
                  type="text"
                  value={typeMaterial}
                  onChange={(e) => setTypeMaterial(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Peso (kg)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Precio </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Proveedor </label>
                <input
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <div className="form-group">
                <label>Categoria </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="input-text"
                />
              </div>
              <button type="submit" className="btn-submit">
                {idMaterial !== null ? "Modificar" : "Agregar"} Material
              </button>
            </form>
    
            <div className="search-container">
              <label>Buscar Material</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-text"
              />
            </div>
    
            <div className="btn-filter--supplier">
              <button
                className="btn-submit"
                onClick={() => {
                  if (listType === "none") setListType("block");
                  else if (listType === "block") setListType("none");
                }}
              >
                Filtrar
              </button>
              <ul className={`list-btn-supplier ${listType} `}>
                {supplies?.map((supplies) => (
                  <li key={supplies.id} onClick={() => setIdSupplier(supplies.id)}>
                    {supplies.nombre_proveedor}
                  </li>
                ))}
                <li onClick={() => setIdSupplier(0)}>todos</li>
              </ul>
            </div>
            <h2>Lista de Material</h2>
    
            {filteredMaterials().length > 0 ? (
              <ul className="product-list">
                {filteredMaterials()?.map((item, index) => (
                  <li key={item.id} className="product-item">
                    <>
                      Nombre del Material: {item.nombre_insumo} - Tipo de Material: {item.tipo_insumo} - Color: {item.color_insumo} - Stock:{" "}
                      {item.cantidad_insumo} - Peso: {item.peso_insumo} kg - Precio:{" "}
                      {item.precio_insumo}$ Categoria: {item.categoria}
                    </>
    
                    <div className="product-actions">
                      <button
                        onClick={() => {
                            setIdMaterial(materials[index].id);
                            console.log(idMaterial);
                            handleEdit({
                                materials,
                                index,
                                setName,
                                setStock,
                                setTypeMaterial,
                                setColor,
                                setWeight,
                                setPrice,
                                setVendor,
                                setCategory
                            })
                        }
                        }
                        className="btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDelete({
                            materials,
                            index
                          })
                        }
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay Material disponibles.</p>
            )}
          </div>
        </>
      );
}