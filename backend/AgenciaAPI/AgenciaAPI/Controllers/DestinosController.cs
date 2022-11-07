using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agenciaViagens.Data;
using agenciaViagens.Model;

namespace agenciaViagens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinosController : ControllerBase
    {
        private readonly DataContext _context;

        public DestinosController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destino>>> GetDestinos()
        {
            return await _context.Destinos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Destino>> GetDestino(int id)
        {
            var destino = await _context.Destinos.FindAsync(id);

            if (destino == null)
            {
                return NotFound();
            }

            return destino;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutDestino(int id, Destino destino)
        {
            var updateDestino = await _context.Destinos.FindAsync(id);

            if (id != destino.Id)
            {
                return BadRequest();
            }

            if (updateDestino == null)
            {
                return NotFound();
            }

            updateDestino.Nome = destino.Nome;
            updateDestino.Estado = destino.Estado;
            updateDestino.Pais = destino.Pais;
            updateDestino.dataIda = destino.dataIda;
            updateDestino.dataVolta = destino.dataVolta;
            updateDestino.Valor = destino.Valor;



            _context.Entry(updateDestino).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DestinoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Destino>> PostDestino(Destino destino)
        {
            _context.Destinos.Add(destino);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDestino", new { id = destino.Id }, destino);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDestino(int id)
        {
            var destino = await _context.Destinos.FindAsync(id);
            if (destino == null)
            {
                return NotFound();
            }

            _context.Destinos.Remove(destino);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DestinoExists(int id)
        {
            return _context.Destinos.Any(e => e.Id == id);
        }
    }
}
