import { _pool } from "../db.js";
import { uploadImage } from "../Libs/ConfigDinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const [rows] = await _pool.query("SELECT * FROM anuncio");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPosts = async (req, res) => {
  try {
    const { titulo, descripcion, carrera_vinculada, tipo_anuncio, referencia } =
      req.body;

    let imagen;

    if (req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath);
      imagen = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      await fs.remove(req.files.imagen.tempFilePath);
    }

    const [rows] = await _pool.query(
      "insert into anuncio(titulo, descripcion, carrera_vinculada, tipo_anuncio, referencia, imagen) values(?, ?, ?, ?, ?, ?)",
      [
        titulo,
        descripcion,
        carrera_vinculada,
        tipo_anuncio,
        referencia,
        imagen.url,
      ]
    );
    res.status(201).json({
      id: rows.insertId,
      titulo,
      descripcion,
      carrera_vinculada,
      tipo_anuncio,
      referencia,
      imagen,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, carrera_vinculada, tipo_anuncio, referencia } =
      req.body;

    const [result] = await _pool.query(
      "UPDATE anuncio SET titulo = IFNULL(?, titulo), descripcion = IFNULL(?, descripcion), carrera_vinculada = IFNULL(?, carrera_vinculada), tipo_anuncio = IFNULL(?, tipo_anuncio), referencia = IFNULL(?, referencia) WHERE id = ?",
      [
        titulo,
        descripcion,
        carrera_vinculada,
        tipo_anuncio,
        referencia,
        id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "egresado no encontrado" });

    const [rows] = await _pool.query("SELECT * FROM anuncio WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo ha sucedido" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await _pool.query("DELETE FROM anuncio WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "egresado no encontrado" });
    }
    res.send("Egresado Eliminado");
  } catch (error) {
    return res.status(500).json({ message: "Algo ha sucedido" });
  }
};
