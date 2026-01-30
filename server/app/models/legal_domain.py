from app import db
from datetime import datetime

class LegalDomain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon_name = db.Column(db.String(50), nullable=False)      # e.g. "Layers"
    color = db.Column(db.String(20), default="blue")
    regulation_count = db.Column(db.Integer, default=0)
    is_standard = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "description": self.description,
            "icon_name": self.icon_name,
            "color": self.color,
            "regulation_count": self.regulation_count,
            "is_standard": self.is_standard,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
# ... existing model class ...

def seed_standard_domains():
    """Seed the 6 standard legal domains (run once via CLI)"""
    standard_domains = [
        {
            "title": "Banking & Finance",
            "slug": "banking-finance",
            "description": "CRD, CRR, MiFID II, PSD2, BRRD",
            "icon_name": "Layers",
            "color": "blue",
            "regulation_count": 28
        },
        {
            "title": "Payments & Fintech",
            "slug": "payments-fintech",
            "description": "PSD2, PSR, Open Banking, Instant Payments",
            "icon_name": "Cpu",
            "color": "emerald",
            "regulation_count": 19
        },
        {
            "title": "Data Protection",
            "slug": "data-protection",
            "description": "GDPR, ePrivacy, Data Act, DGA",
            "icon_name": "Shield",
            "color": "amber",
            "regulation_count": 14
        },
        {
            "title": "Cybersecurity & DORA",
            "slug": "cybersecurity-dora",
            "description": "DORA, NIS2, Cybersecurity Act",
            "icon_name": "Lock",
            "color": "rose",
            "regulation_count": 12
        },
        {
            "title": "AI & Digital Services",
            "slug": "ai-digital-services",
            "description": "AI Act, DSA, DMA, Data Act",
            "icon_name": "Cpu",
            "color": "violet",
            "regulation_count": 9
        },
        {
            "title": "AML & Sanctions",
            "slug": "aml-sanctions",
            "description": "AMLD6, AML Regulation, Sanctions screening",
            "icon_name": "Database",
            "color": "slate",
            "regulation_count": 16
        }
    ]

    for data in standard_domains:
        if not LegalDomain.query.filter_by(slug=data["slug"]).first():
            domain = LegalDomain(
                title=data["title"],
                slug=data["slug"],
                description=data["description"],
                icon_name=data["icon_name"],
                color=data["color"],
                regulation_count=data["regulation_count"],
                is_standard=True
            )
            db.session.add(domain)

    db.session.commit()
    print("✅ Standard legal domains seeded successfully!")