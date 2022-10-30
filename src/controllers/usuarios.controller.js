import { _pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await _pool.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { nombre, apellido, nombre_usuario, contraseña, fecha_registro } =
      req.body;
    const [rows] = await _pool.query(
      "insert into user(nombre, apellido, nombre_usuario, contraseña, fecha_registro) values(?, ?, ?, ?, ?)",
      [nombre, apellido, nombre_usuario, contraseña, fecha_registro]
    );
    res.status(201).json({
      id: rows.insertId,
      nombre,
      apellido,
      nombre_usuario,
      contraseña,
      fecha_registro,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, nombre_usuario, contraseña, fecha_registro } =
      req.body;

    const [result] = await _pool.query(
      "UPDATE user SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), nombre_usuario = IFNULL(?, nombre_usuario), contraseña = IFNULL(?, contraseña), fecha_registro = IFNULL(?, fecha_registro) WHERE id = ?",
      [nombre, apellido, nombre_usuario, contraseña, fecha_registro, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "user not found" });

    const [rows] = await _pool.query("SELECT * FROM user WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await _pool.query("DELETE FROM user WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "user not found" });
    }
    res.send("User Deleted");
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
