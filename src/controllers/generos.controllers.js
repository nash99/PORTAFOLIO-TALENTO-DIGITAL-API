import {pool} from '../db.js'

//Obtencion de todos los generos musicales
export const getGeneros = async (req,res) => {
    try{
        const [ rows ] = await pool.query('select * from genero_musical');
        res.json(rows);
    } catch (error){
        return res.status(500).json({
            message: 'Algo falló'
        })
    }
}

//Obtener usuarios filtrando por genero musical INNER JOIN
export const getGenerosUsuarios = async (req,res) => {
    const idGenero = req.params.id;
    try{
        const [ rows ] = await pool.query('SELECT * FROM imagen I INNER JOIN perfil P ON I.idPerfil = P.idPerfil INNER JOIN genero_musical G on P.idGenero_musical = G.idGenero_musical WHERE P.idGenero_musical = ?;',[req.params.id]);
        if(rows.length <= 0) return  res.status(404).json([{
            message: 'Usuario no encontrado',
            nombreGenero_musical: 'Genero'
        }])
        res.json(rows);
    } catch (error){
        return res.status(500).json({
            message: 'Algo falló'
        })
    }

}

