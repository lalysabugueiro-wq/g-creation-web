// Forma de los datos del sistema — misma forma en mock (acá) y en Supabase real
// (modulos/08a-sistema-real.md). Arquetipo `profesional`: solo consultas.

export type InquiryStatus = "nueva" | "respondida" | "cerrada";

export type Inquiry = {
  id: string;
  createdAt: string; // ISO
  name: string;
  phone: string;
  email: string;
  message: string;
  reason?: string; // área: Marcas, Turismo, Eventos, Bodas
  projectFormat?: string; // Proyecto, Campaña, Cobertura, Recurrente, Boda
  eventDate?: string; // texto libre: "junio 2027", "temporada de invierno"
  location?: string;
  preferredContact?: "mail" | "telefono" | "whatsapp";
  status: InquiryStatus;
};
