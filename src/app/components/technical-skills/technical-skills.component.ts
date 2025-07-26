import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technical-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.scss']
})
export class TechnicalSkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  skills = [
    'Python', 'C++', 'Angular', 'SpringBoot', 'React',
    'JavaScript', 'Java', 'GitHub', 'Agile', 'Sass', 'AI'
  ];

  bubbles: any[] = [];
  private animationFrameId: number = 0;

  ngAfterViewInit() {
    this.initializeCanvasAndBubbles();
    window.addEventListener('resize', this.onWindowResize);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onWindowResize);
  }

  @HostListener('window:resize')
  onWindowResize = () => {
    cancelAnimationFrame(this.animationFrameId);
    this.initializeCanvasAndBubbles();
  }

  private initializeCanvasAndBubbles() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const computedStyle = getComputedStyle(canvas);
    canvas.width = parseInt(computedStyle.width!, 10);
    canvas.height = parseInt(computedStyle.height!, 10);

    const width = canvas.width;
    const height = canvas.height;

    const isOverlapping = (x: number, y: number, r: number, bubbles: any[]) => {
      return bubbles.some(b => {
        const dx = b.x - x;
        const dy = b.y - y;
        return Math.sqrt(dx * dx + dy * dy) < b.r + r + 10;
      });
    };

    this.bubbles = [];
    const baseRadius = Math.min(width, height) * 0.08;
    for (let i = 0; i < this.skills.length; i++) {
      let placed = false;
      let attempts = 0;
      let r = baseRadius + Math.random() * (baseRadius * 0.4);
      r = Math.max(r, 30);
      r = Math.min(r, 60);

      let x = 0, y = 0;
      while (!placed && attempts < 200) {
        x = Math.random() * (width - 2 * r) + r;
        y = Math.random() * (height - 2 * r) + r;
        if (!isOverlapping(x, y, r, this.bubbles)) {
          placed = true;
        }
        attempts++;
      }
      if (!placed) {
        x = Math.random() * (width - 2 * r) + r;
        y = Math.random() * (height - 2 * r) + r;
      }

      // Initial speed slightly increased to ensure constant movement
      const initialSpeed = 0.8; // Adjusted for a bit more constant movement
      this.bubbles.push({
        x, y, r,
        vx: (Math.random() - 0.5) * 2 * initialSpeed,
        vy: (Math.random() - 0.5) * 2 * initialSpeed,
        skill: this.skills[i],
        color: `hsl(${i * 33}, 70%, 60%)`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // --- MODIFICATION: Adjusted friction and collision energy loss ---
      const friction = 0.998; // Very slight friction to prevent stopping completely
      const wallBounceFactor = 0.9; // Retain more speed on wall bounce
      const collisionEnergyLoss = 0.9; // Retain more speed on bubble-bubble collision

      // Minimum velocity to prevent bubbles from becoming truly static
      const minVelocity = 0.1;

      for (let i = 0; i < this.bubbles.length; i++) {
        let b = this.bubbles[i];
        b.x += b.vx;
        b.y += b.vy;

        // Apply friction
        b.vx *= friction;
        b.vy *= friction;

        // Ensure minimum velocity to keep movement constant
        if (Math.abs(b.vx) < minVelocity && Math.abs(b.vy) < minVelocity) {
          b.vx += (Math.random() - 0.5) * minVelocity * 2; // Nudge with random direction
          b.vy += (Math.random() - 0.5) * minVelocity * 2;
        }


        // Bounce off walls
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx *= -wallBounceFactor;
        }
        if (b.x + b.r > width) {
          b.x = width - b.r;
          b.vx *= -wallBounceFactor;
        }
        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy *= -wallBounceFactor;
        }
        if (b.y + b.r > height) {
          b.y = height - b.r;
          b.vy *= -wallBounceFactor;
        }

        // Collision detection and response
        for (let j = i + 1; j < this.bubbles.length; j++) {
          let b2 = this.bubbles[j];
          let dx = b2.x - b.x;
          let dy = b2.y - b.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let minDist = b.r + b2.r;

          if (dist < minDist) {
            let angle = Math.atan2(dy, dx);
            let overlap = minDist - dist;
            let separationFactor = 0.5;

            b.x -= (overlap * separationFactor) * Math.cos(angle);
            b.y -= (overlap * separationFactor) * Math.sin(angle);
            b2.x += (overlap * separationFactor) * Math.cos(angle);
            b2.y += (overlap * separationFactor) * Math.sin(angle);

            let nx = dx / dist;
            let ny = dy / dist;

            let tanX = -ny;
            let tanY = nx;

            let v1n = b.vx * nx + b.vy * ny;
            let v1t = b.vx * tanX + b.vy * tanY;
            let v2n = b2.vx * nx + b2.vy * ny;
            let v2t = b2.vx * tanX + b2.vy * tanY;

            [v1n, v2n] = [v2n, v1n];

            // Apply energy loss to normal velocities
            v1n *= collisionEnergyLoss;
            v2n *= collisionEnergyLoss;

            b.vx = v1n * nx + v1t * tanX;
            b.vy = v1n * ny + v1t * tanY;
            b2.vx = v2n * nx + v2t * tanX;
            b2.vy = v2n * ny + v2t * tanY;
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
        const fontSize = Math.max(8, b.r * 0.35);
        ctx.font = `bold ${fontSize}px Montserrat, Arial, sans-serif`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.skill, b.x, b.y);
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }
}