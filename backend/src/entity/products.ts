import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 90 })
  nome: string;

  @Column({ type: "text" })
  descricao: string;

  @Column({ type: "varchar", length: 50 })
  genero: string;

  @Column({ type: "varchar", length: 90 })
  categoria: string;

  @Column({ type: "varchar", length: 90 })
  marca: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  quantidade: string | null;

  @Column({ type: "text", nullable: true })
  observacao: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  ingredientes: string;

  @Column({ type: "text" })
  imagem: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  validade: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  preco_promocional: number | null;

  @Column({ type: "tinyint", width: 1, default: 1 })
  ativo: number;

  @Column({ type: "varchar", length: 20 })
  cadastrado: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  alterado: string | null;
}
