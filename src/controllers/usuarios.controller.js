import { _pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await _pool.query("SELECT * FROM egresado");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { nombre, apellido, cedula, correo} =
      req.body;
    const [rows] = await _pool.query(
      "insert into egresado(nombre, apellido, cedula, correo) values(?, ?, ?, ?)",
      [nombre, apellido, cedula, correo]
    );
    res.status(201).json({
      id: rows.insertId,
      nombre,
      apellido,
      cedula,
      correo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, cedula, genero, celular, correo, situacion, nombre_empresa, sector } =
      req.body;

    const [result] = await _pool.query(
      "UPDATE egresado SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), cedula = IFNULL(?, cedula), genero = IFNULL(?, genero), celular = IFNULL(?, celular), correo = IFNULL(?, correo), situacion = IFNULL(?, situacion), nombre_empresa = IFNULL(?, nombre_empresa), sector = IFNULL(?, sector) WHERE id = ?",
      [nombre, apellido, cedula, genero, celular, correo, situacion, nombre_empresa, sector, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "egresado no encontrado" });

    const [rows] = await _pool.query("SELECT * FROM egresado WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo ha sucedido" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await _pool.query("DELETE FROM egresado WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "egresado no encontrado" });
    }
    res.send("Egresado Eliminado");
  } catch (error) {
    return res.status(500).json({ message: "Algo ha sucedido" });
  }
};
