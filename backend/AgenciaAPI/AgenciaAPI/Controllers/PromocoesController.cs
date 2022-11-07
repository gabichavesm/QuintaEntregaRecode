using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agenciaViagens.Data;
using agenciaViagens.Model;

namespace AgenciaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromocoesController : ControllerBase
    {
        private readonly DataContext _context;

        public PromocoesController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promocao>>> GetPromocao()
        {
            return await _context.Promocoes.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Promocao>> GetPromocao(int id)
        {

            var promocao = await _context.Promocoes.FindAsync(id);



            if (promocao == null)
            {
                return NotFound();
            }


            return Ok(promocao);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromocao(int id, Promocao promocao)
        {
            var updatePromocao = await _context.Promocoes.FindAsync(id);
            var destino = await _context.Destinos.FindAsync(promocao.Destino.Id);

            if (destino == null)
            {
                return BadRequest();
            }

            if (id != promocao.Id)
            {
                return BadRequest();
            }

            if (updatePromocao == null)
            {
                return NotFound();
            }

            updatePromocao.Nome = promocao.Nome;
            updatePromocao.valorPromo = promocao.valorPromo;
            updatePromocao.Destino = destino;



            _context.Entry(updatePromocao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromocaoExists(id))
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
        public async Task<ActionResult<Promocao>> PostPromocao(Promocao promocao)
        {
            var destino = await _context.Destinos.FindAsync(promocao.Destino.Id);
            if (destino == null)
            {
                return BadRequest();
            }
            promocao.Destino = destino;
            _context.Promocoes.Add(promocao);
            await _context.SaveChangesAsync();

            return Ok(promocao);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromocao(int id)
        {
            var promocao = await _context.Promocoes.FindAsync(id);
            if (promocao == null)
            {
                return NotFound();
            }

            _context.Promocoes.Remove(promocao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromocaoExists(int id)
        {
            return _context.Promocoes.Any(e => e.Id == id);
        }
    }
}
