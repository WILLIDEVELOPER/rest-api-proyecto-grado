import { _pool } from "../db.js";

export const getEmployes = async (req, res) => {
  try {
    const [rows] = await _pool.query("SELECT * FROM companydb");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployesById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await _pool.query("SELECT * FROM companydb WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmployes = async (req, res) => {
  try {
    const { nombre, salario } = req.body;
    const [rows] = await _pool.query(
      "INSERT INTO companydb(nombre, salario) VALUES (?, ?)",
      [nombre, salario]
    );
    res.status(201).json({ id: rows.insertId, nombre, salario });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmployes = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, salario } = req.body;

    const [result] = await _pool.query(
      "UPDATE companydb SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?",
      [nombre, salario, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await pool.query("SELECT * FROM companydb WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployes = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await _pool.query("DELETE FROM companydb WHERE id = ?", [
      id,
    ]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
