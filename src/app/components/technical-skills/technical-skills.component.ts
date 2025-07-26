import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.scss']
})
export class TechnicalSkillsComponent implements AfterViewInit {
  @ViewChild('skillsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  skills = [
    'Python', 'C++', 'Angular', 'SpringBoot', 'React',
    'JavaScript', 'Java', 'GitHub', 'Agile', 'Sass', 'AI'
  ];

  bubbles: any[] = [];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    // Helper to check overlap
    function isOverlapping(x: number, y: number, r: number, bubbles: any[]) {
      return bubbles.some(b => {
        const dx = b.x - x;
        const dy = b.y - y;
        return Math.sqrt(dx * dx + dy * dy) < b.r + r + 10; // 10px extra spacing
      });
    }

    // Initialize bubbles with spacing
    this.bubbles = [];
    for (let i = 0; i < this.skills.length; i++) {
      let placed = false;
      let attempts = 0;
      let r = 45;
      let x = 0, y = 0;
      while (!placed && attempts < 100) {
        x = Math.random() * (width - 2 * r) + r;
        y = Math.random() * (height - 2 * r) + r;
        if (!isOverlapping(x, y, r, this.bubbles)) {
          placed = true;
        }
        attempts++;
      }
      this.bubbles.push({
        x, y, r,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        skill: this.skills[i],
        color: `hsl(${i * 33}, 70%, 60%)`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Move and draw bubbles
      for (let i = 0; i < this.bubbles.length; i++) {
        let b = this.bubbles[i];
        b.x += b.vx;
        b.y += b.vy;

        // Bounce off walls
        if (b.x - b.r < 0 || b.x + b.r > width) b.vx *= -1;
        if (b.y - b.r < 0 || b.y + b.r > height) b.vy *= -1;

        // Collision detection
        for (let j = i + 1; j < this.bubbles.length; j++) {
          let b2 = this.bubbles[j];
          let dx = b2.x - b.x;
          let dy = b2.y - b.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.r + b2.r) {
            // Simple elastic collision
            [b.vx, b2.vx] = [b2.vx, b.vx];
            [b.vy, b2.vy] = [b2.vy, b.vy];
          }
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();

        // Draw skill text
        ctx.font = 'bold 0.9rem Montserrat, Arial, sans-serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.skill, b.x, b.y);
      }

      requestAnimationFrame(animate);
    };
    animate();
  }
}