import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./user"; // Importe a entidade Usuario
import { Produto } from "./products";

//Entidade Avaliações
@Entity()
export class Avaliacoes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto, (produto) => produto.id) // Relacionamento Many-to-One com Produto
  @JoinColumn({ name: "id_produto" }) // Nome da coluna de chave estrangeira
  id_produto: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id) // Relacionamento Many-to-One com Usuario
  @JoinColumn({ name: "id_usuario" }) // Nome da coluna de chave estrangeira
  id_usuario: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  avaliacao: number;

  @Column({ type: "text" })
  comentario: string;

  @Column({ type: "tinyint", width: 1, default: 1 })
  ativo: number;

  @Column({ type: "varchar", length: 20 })
  cadastrado: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  alterado: string | null;
}
